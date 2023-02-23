import * as React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as MainSiteStyles from '../globals'
import Choice from './Choice'
import Question from './Question'
import Graph from './Graph'

import { useState } from 'react';

function grabPollData() {

    /**
     * TODO
     * 
     *  Replace this code with a fetch to grab all/most recent poll data --> figure out admin-ajax.php query params
     */

    return {
        'id': 293,
        'nonce': '91348f71e0',
        'question': 'Academic student workers and graduate student researchers represented by the United Auto Workers union recently ended a nearly six-week strike in which they called for better working conditions and equitable wages. The contract stipulates pay increases for all workers – for some, pay increases of up to 80% – as well as anti-harassment policies and increased childcare support. However, the negotiations have struck controversy among some UAW members dissatisfied with the results of the contract. What are your thoughts on this issue?',
        'answers': [
            {   'text': 'Only the voices of the bargaining team were heard during the negotiation process – the contract is not all-encompassing of student workers and should not have been ratified.', 
                'number': 1189  },
            {   'text': 'The mediation resulted in a realistic contract for academic workers at this time. The agreed-upon result generally covered what the strikers were asking for.', 
                'number': 1190  },
            {   'text': 'I have feelings about this that are not described in the options above.', 
                'number': 1191  },
            {   'text': 'The contract is neither good nor bad and/or this issue does not directly affect me as a student.', 
                'number': 1192  },
        ]
    }
}

async function grabPollResults(pollData) {

    return {
        'id': 293,
        'nonce': '91348f71e0',
        'counts': [3, 2, 1, 0],
        'total': 6,
    }

    /*
    let url = `https://wp.dailybruin.com/wp-admin/admin-ajax.php?action=polls&view=result&poll_id=${pollData.id}&poll_${pollData.id}_nonce=${pollData.nonce}`;

    let response = fetch(url, {
        method: 'GET',
    }).then((data) => data.json()).then((data) => console.log(data))*/
}



const Poll = () => {

    const [pollData, setPollData] = useState(grabPollData());
    const [hasVoted, setHasVoted] = useState(false);
    const [pollResults, setPollResults] = useState(null);

    async function voteForPoll(pollData, number) {
        let url = `https://wp.dailybruin.com/wp-admin/admin-ajax.php`;
        let data = {
            'action': 'polls',
            'view': 'booth',
            'poll_id': pollData.id,
        }
        data[`poll_${pollData.id}`] = number;
        data[`poll_${pollData.id}_nonce`] = pollData.nonce;
    
        console.log(data);

        //  MOVE THIS LINE INTO .then ONCE REQ WORKS
        setHasVoted(true);
    
        let response = fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((data) => data.json()).then((data) => console.log(data));

        setPollResults(await grabPollResults(pollData));
    }


    // scraped from site
    let pollsL10n = {"ajax_url":"https:\/\/wp.dailybruin.com\/wp-admin\/admin-ajax.php","text_wait":"Your last request is still being processed. Please wait a while ...","text_valid":"Please choose a valid poll answer.","text_multiple":"Maximum number of choices allowed: ","show_loading":"0","show_fading":"1"};

    return (
        <div
            css={css`
                background-color: ${MainSiteStyles.white};
                box-shadow: ${MainSiteStyles.cardShadow};
                justify-content: center;
                margin: auto;
                max-width: 292px;`}>
            <div
                css={css`
                    background-color: ${MainSiteStyles.black};
                    padding: 2px 0px 4px 10px;
                `}
                >
                <h2
                    css={css`
                    color: ${MainSiteStyles.white};
                    font-family: ${MainSiteStyles.menuFont}, sans-serif;
                    font-size: 1.125rem;
                    font-weight: 900;
                    line-height: 1.4375rem;
                    margin: 0px;
                    overflow-wrap: break-word;
                    `}
                >
                    {'POLL'}
                </h2>
            </div>
            <div
                css={css`
                    padding: ${MainSiteStyles.cardPadding};
                `}
                >
                <h3
                    css={css`
                    font-family: ${MainSiteStyles.headlineFont}, serif;
                    font-size: 0.875rem;
                    font-weight: 700;
                    line-height: 1.125rem;
                    margin: 0px 0px 3px;
                    `}
                >
                    {pollData.question}
                </h3><br/>
                <form>
                    {pollData && pollData.answers.map((answer, i) => {
                        return (
                            <div
                                css={css`
                                    font-family: ${MainSiteStyles.headlineFont}, serif;
                                    font-size: 0.775rem;
                                    font-weight: 700;
                                    line-height: 1rem;
                                    margin: 0px 0px 10px;
                                `} key={i}
                                >
                                <div>
                                    <input name="answer" type="hidden" value={answer}></input>
                                    <a onClick={() => voteForPoll(pollData, answer.number)}>{answer.text}</a>
                                    {pollResults && <div>
                                                        <p>votes: {pollResults.counts[i]}</p>
                                                        <div css={css`min-height: 10px; width: calc((${pollResults.counts[i] / pollResults.total} * (100% - 5px)) + 5px); background: ${MainSiteStyles.DBblue}`}></div>
                                                    </div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </form>
            </div>
        </div>
    )
}
export default Poll;


// class Poll extends React.Component {
//     state = {
//         hasVoted: false,
//     }

//   constructor(props) {
//     super(props)
//     this.handler = this.handler.bind(this)
//   }

//    handler() {
//     this.setState({
//       hasVoted: true,
//     })
//   }

//    render() {
//     const renderedChoices = this.props.poll.map((poll, index) => (
//       <Choice
//         choice={poll.choice}
//         votes={poll.votes}
//         key={index}
//         handler={this.handler}
//       />
//     ))

//     return (
//       <div
//         css={css`
//           background-color: ${MainSiteStyles.white};
//           box-shadow: ${MainSiteStyles.cardShadow};
//           justify-content: center;
//           margin: auto;
//           max-width: 292px;
//         `}
//       >
//         <div
//           css={css`
//             background-color: ${MainSiteStyles.black};
//             padding: 2px 0px 4px 10px;
//           `}
//         >
//           <h2
//             css={css`
//               color: ${MainSiteStyles.white};
//               font-family: ${MainSiteStyles.menuFont}, sans-serif;
//               font-size: 1.125rem;
//               font-weight: 900;
//               line-height: 1.4375rem;
//               margin: 0px;
//               overflow-wrap: break-word;
//             `}
//           >
//             {'POLL'}
//           </h2>
//         </div>
//         <Question text={this.props.question} />
//         <div
//           css={css`
//             padding: ${MainSiteStyles.cardPadding};
//           `}
//         >
//           {!this.state.hasVoted && renderedChoices}
//           {this.state.hasVoted && (
//             <Graph data={this.props.poll} legend={this.props.legend} />
//           )}
//         </div>
//       </div>
//     )
//   }
// }

// export default Poll
