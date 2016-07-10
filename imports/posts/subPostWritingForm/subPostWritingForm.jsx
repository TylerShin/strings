import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';
import Spinner from 'react-spinner';

class SubPostWritingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFileUploading: false,
      uploadedPublicIds: [],
    };
  }

  componentDidMount() {
    const self = this;
    this.summerNote = $('.subpost-summernote').summernote({
      height: 300,
      callbacks: {
        onImageUpload(files) {
          self.setState({
            isFileUploading: true,
          });
          if (files.length > 1) {
            let uploadCompletedCounter = 0;
            Cloudinary.upload(files, {}, (err, res) => {
              if (err) {
                alert('Error가 발생했습니다.');
              } else {
                uploadCompletedCounter += 1;
                const newArr = self.state.uploadedPublicIds.concat([res.public_id]);
                self.setState({
                  uploadedPublicIds: newArr,
                });
                self.summerNote.summernote('insertImage', res.url);
                if (uploadCompletedCounter === files.length) {
                  self.setState({
                    isFileUploading: false,
                  });
                }
              }
            });
          } else {
            Cloudinary.upload(files, {}, (err, res) => {
              if (err) {
                alert(err.message);
              } else {
                self.setState({
                  isFileUploading: false,
                });
                const newArr = self.state.uploadedPublicIds.concat([res.public_id]);
                self.setState({
                  uploadedPublicIds: newArr,
                });
                self.summerNote.summernote('insertImage', res.url);
              }
            });
          }
        },
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { post } = this.props;
    const { uploadedPublicIds } = this.state;

    Meteor.call('subPosts.insert', {
      content: $('.subpost-summernote').summernote('code'),
      tagId: post.get('tagId'),
      postId: post.get('_id'),
      publicIds: uploadedPublicIds,
    }, (err) => {
      if (err) {
        alert(err.message);
      } else {
        $('.subpost-summernote').summernote('code', '');
      }
    });
  }

  render() {
    const { isFileUploading } = this.state;
    let spinner;
    if (isFileUploading) {
      spinner = (
        <div className="spinner-page-overlay-wrapper">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="sub-post-writing-form">
        {spinner}
        <form className="sub-post-form" onSubmit={(e) => { this.handleSubmit(e); }}>
          <div className="subpost-summernote"></div>
          <button type="submit" className="sub-post-submit-btn">등록</button>
        </form>
      </div>
    );
  }
}

SubPostWritingForm.propTypes = {
  post: ImmutablePropTypes.map.isRequired,
};

export default SubPostWritingForm;
