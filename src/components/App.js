import { Component } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

const BUTTONS_CONFIG = ['good', 'neutral', 'bad'];

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClick = event => {
    const id = event.target.id;
    this.setState(prevState => ({ [id]: prevState[id] + 1 }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    return Math.round(good * (100 / this.countTotalFeedback())) || 0;
  };

  render() {
    const total = this.countTotalFeedback();
    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            onClick={this.handleClick}
            options={BUTTONS_CONFIG}
          />
        </Section>
        <Section title="Statistics">
          {total ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={total}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </div>
    );
  }
}

export default App;
