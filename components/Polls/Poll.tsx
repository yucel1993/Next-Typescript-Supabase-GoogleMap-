import { supabaseBackend } from '@/lib/subaseClient';

type Props = {
	id: number;
};

type AnswerResponse = {
	answer: string;
	answer_id: number;
	poll_id: number;
	PollVotes: [{ count: number }];
};

type AnswerData = Omit<
	ReturnType<typeof getAnswersData>['answers'][number],
	'PullVotes'
>;

export default async function Poll({ id }: Props) {
	const { data, error } = await supabaseBackend
		.from('Polls')
		.select(
			`
   	 *,
   	 PollAnswers(*,
   		 PollVotes(count)
   		 )
   	 `
		)
		.eq('poll_id', id)
		.single();

	if (error) {
		throw new Error(error.message);
	}

	const { question } = data;

	// Fix error by changing type of pollAnswers to any
	const pollAnswers = data.PollAnswers as any;

	const { answersCount, answers } = getAnswersData(pollAnswers);

	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<h2>{question}</h2>
			<h1>{answersCount}</h1>
			<h2>{answers[0].percentage}</h2>
		</div>
	);
}

function getAnswersData(pollAnswers: AnswerResponse[]): {
	totalVotes: number;
	hasVotes: boolean;
	answersCount: number;
	answers: {
		votesCount: number;
		percentage: number;
		answer: string;
		answer_id: number;
		poll_id: number;
	}[];
} {
	return {
		totalVotes: 0,
		hasVotes: false,
		answersCount: pollAnswers.length,
		answers: pollAnswers.map((answer) => {
			const { answer: answerText, answer_id, poll_id, PollVotes } = answer;
			const votesCount = PollVotes[0].count;
			const percentage = votesCount / pollAnswers.length;
			return {
				votesCount,
				percentage,
				answer: answerText,
				answer_id,
				poll_id,
			};
		}),
	};
}

// import { supabaseBackend } from '@/lib/supabaseClient';
// import PollResult from './PollResult';
// import classes from './Poll.module.css';
// type Props = {
//     id: number;
// };

// type AnswerResponse = {
//     answer: string;
//     answer_id: number;
//     poll_id: number;
//     PollVotes: [{ count: number }];
// };

// export type AnswerData = Omit<
//     ReturnType<typeof getAnswersData>['answers'][number],
//     'PollVotes'
// >;

// export default async function Poll({ id }: Props) {
//     const { data, error } = await supabaseBackend
//    	 .from('Polls')
//    	 .select(
//    		 `
//    	 *,
//    	 PollAnswers(*,
//    		 PollVotes(count)
//    		 )
//    	 `
//    	 )
//    	 .eq('poll_id', id)
//    	 .single();

//     if (error) {
//    	 throw new Error(error.message);
//     }

//     const { question } = data;
//     const pollAnswers = data.PollAnswers as unknown as AnswerResponse[];

//     const { totalVotes, answers, hasVotes } = getAnswersData(pollAnswers);
//     const colorGenerator = getColor();
//     return (
//    	 <div>
//    		 {/*     <pre>{JSON.stringify(answers, null, 2)}</pre> */}
//    		 <h2>{question}</h2>
//    		 {hasVotes ? (
//    			 <p>Abgegebene Stimmen: {totalVotes}</p>
//    		 ) : (
//    			 <p>Noch keine Stimmen</p>
//    		 )}
//    		 {hasVotes && (
//    			 <div className={classes.pollResults}>
//    				 {answers.map((answer) => (
//    					 <PollResult
//    						 key={answer.answer_id}
//    						 {...answer}
//    						 color={colorGenerator.next().value!}
//    					 />
//    				 ))}
//    			 </div>
//    		 )}
//    	 </div>
//     );
// }

// function getAnswersData(pollAnswers: AnswerResponse[]) {
//     const totalVotes = pollAnswers.reduce((sum, anwer) => {
//    	 return sum + anwer.PollVotes[0].count;
//     }, 0);

//     const hasVotes = totalVotes > 0;

//     const answers = pollAnswers.map((answer) => {
//    	 const { count } = answer.PollVotes[0];
//    	 const percentage = hasVotes ? (count / totalVotes) * 100 : 0;
//    	 return {
//    		 ...answer,
//    		 votesCount: count,
//    		 percentage,
//    	 };
//     });

//     return {
//    	 answersCount: pollAnswers.length,
//    	 totalVotes,
//    	 hasVotes,
//    	 answers,
//     };
// }

// // https://stackoverflow.com/questions/52005083/how-to-define-css-variables-in-style-attribute-in-react-and-typescript

// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*?retiredLocale=de
// function* getColor(colors = ['red', 'green', 'blue']) {
//     let i = 0;

//     while (true) {
//    	 yield colors[i++ % colors.length];
//     }
// }
