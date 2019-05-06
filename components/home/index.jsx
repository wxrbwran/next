import React from 'react';

class Home extends React.Component {
  componentDidMount() {
    console.log('loaded');
  }

  componentDidUpdate () {
    console.log('updated');
  }

  render() {
    const { title, show } = this.props;
    return (
      <div>
        <span>{ title }</span>
        { show && (
          <div>
          hi ~~~~
          </div>
        ) }
      </div>
    );
  }
}

export default Home;
