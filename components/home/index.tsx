import React from 'react';

interface IProps {
  title: string;
  show: boolean;
}

class Home extends React.Component<IProps> {

  componentDidMount() {
    console.log('loaded');
  }

  componentDidUpdate() {
    console.log('updated');
  }

  render () {
    const { title, show } = this.props;
    return (
      <div>
        <span>{ title }</span>
        { show && <div>
          hi ~~~~
        </div> }
      </div>
    );
  }
}

export default Home;
