import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

const SubPostShow = ({ subPost }) => {
  function createMarkup() {
    return {
      __html: subPost.get('content'),
    };
  }

  return (
    <div className="subpost-component">
      <div className="subpost-info clearfix">
        {subPost.get('userId')}
        <div className="subpost-info-created-at">
          {moment(subPost.get('createdAt')).fromNow()}
        </div>
      </div>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
};

SubPostShow.propTypes = {
  currentUser: ImmutablePropTypes.map.isRequired,
  subPost: ImmutablePropTypes.map.isRequired,
};

export default SubPostShow;
