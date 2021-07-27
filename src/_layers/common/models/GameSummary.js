
function isRound(doc) {
  return /Round#\d+$/.test(doc.sk);
}

class GameSummary  {

  constructor(props) {
    this.rounds = props.rounds;
    this.answers = props.answers;
  }

  static fromDocuments(items) {
    const rounds = items.filter(item => isRound(item));
    const answers = items.filter(item => !isRound(item));
    return new GameSummary({ rounds, answers });
  }

  toApiResponse() {
    return {
      results: this.rounds.map(round => this.constructRound(round)),
    }
  }

  constructRound(round) {
    const { roundNumber, choices } = round;
    const roundAnswers = this.answers.filter(ans => ans.roundNumber == roundNumber);
    return {
      round: roundNumber,
      totalAnswers: roundAnswers.length,
      choices: choices.map(choice => this.constructChoice({ choice, roundAnswers })),
    }
  }

  constructChoice({ choice, roundAnswers }) {
    const { id, description } = choice;
    return {
      id,
      description,
      votes: roundAnswers.filter(ra => ra.choiceId == id).map(ra => ra.alias)
    }
  }
}

module.exports = GameSummary;