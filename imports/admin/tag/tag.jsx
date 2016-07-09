import { Meteor } from 'meteor/meteor';
import React from 'react';
import { fromJS } from 'immutable';
import { createContainer } from 'meteor/react-meteor-data';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Tags } from '../../api/tags';

class TagAdmin extends React.Component {
  handleAddTag(e) {
    e.preventDefault();
    const newTag = this.refs.tag.value;
    Meteor.call('tags.insert', newTag, (err) => {
      if (err) {
        alert(err.message);
      } else {
        this.refs.tag.value = '';
      }
    });
  }

  render() {
    const { tags } = this.props;
    let tagListNode;
    if (tags.count() > 0) {
      tagListNode = tags.map((tag, index) => {
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
  currentUser: ImmutablePropTypes.map.isRequired,
  tags: ImmutablePropTypes.list.isRequired,
  tagSubsReady: React.PropTypes.bool.isRequired,
};

export default createContainer(() => {
  const tagSubs = Meteor.subscribe('tags');
  const tagSubsReady = tagSubs.ready();
  const tags = fromJS(Tags.find().fetch());
  const currentUser = fromJS(Meteor.user()) || fromJS({});
  return {
    tags,
    tagSubsReady,
    currentUser,
  };
}, TagAdmin);
