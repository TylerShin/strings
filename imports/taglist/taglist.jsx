import { Meteor } from 'meteor/meteor';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { loadTags } from './actions';

class Taglist extends React.Component {
  componentWillMount() {
    this.tagSubs = Meteor.subscribe('tags');
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadTags());
  }

  componentWillUnmount() {
    this.tagSubs.stop();
  }

  render() {
    const { tags } = this.props;
    if (!tags.get('isOpen')) {
      return null;
    }

    let tagListNode;
    if (tags.get('tags').count() > 0) {
      tagListNode = tags.get('tags').map((tag, index) => {
        return (
          <span className="tag-item" key={index}>
            {tag.get('tag')}
          </span>
        );
      });
    }

    return (
      <div className="taglist-component">
        <div className="taglist-wrapper">
          {tagListNode}
        </div>
      </div>
    );
  }
}

Taglist.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  tags: ImmutablePropTypes.map.isRequired,
};

export default Taglist;
