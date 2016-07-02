import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { loadTags, addTag } from '../../taglist/actions';

class TagAdmin extends React.Component {
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

  handleAddTag(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    const newTag = this.refs.tag.value;

    dispatch(addTag({
      tagName: newTag,
    }));
    this.refs.tag.value = '';
  }

  render() {
    const { tags } = this.props;
    let tagListNode;
    if (tags.get('tags').count() > 0) {
      tagListNode = tags.get('tags').map((tag, index) => {
        return (
          <li key={index}>
            {tag.get('tag')}
          </li>
        );
      });
    }
    return (
      <div className="tag-component">
        <h2>Tag 추가</h2>
        <form onSubmit={(e) => { this.handleAddTag(e); }}>
          <label>태그 이름</label>
          <input type="text" ref="tag" />
          <button type="submit">입력</button>
        </form>
        <h3>Tag List</h3>
        <ul>
          {tagListNode}
        </ul>
      </div>
    );
  }
}

TagAdmin.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  currentUser: ImmutablePropTypes.map.isRequired,
  tags: ImmutablePropTypes.map.isRequired,
};

function mapStateToProps(state) {
  const { currentUser, tags } = state;
  return {
    currentUser,
    tags,
  };
}
export default connect(mapStateToProps)(TagAdmin);
