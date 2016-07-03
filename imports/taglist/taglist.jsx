import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { loadTags, closeTagList } from './actions';

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

  handleCloseTagList() {
    const { dispatch } = this.props;
    dispatch(closeTagList());
  }

  render() {
    const { tags } = this.props;
    if (!tags.get('isOpen')) {
      return null;
    }

    let tagListNode;
    if (tags.get('tags').count() > 0) {
      tagListNode = tags.get('tags').map((tag, index) => {
        const tagId = tag.get('_id');
        return (
          <Link
            to={`/posts/${tagId}`}
            className="tag-item"
            key={index}
            onClick={() => { this.handleCloseTagList(); }}
          >
            {tag.get('tag')}
          </Link>
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
