import React from 'react';
import { browserHistory } from 'react-router';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';
import Spinner from 'react-spinner';

class WritingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFileUploading: false,
      uploadedPublicIds: [],
    };
  }
  componentDidMount() {
    const self = this;
    this.summerNote = $('.post-summernote').summernote({
      height: 400,
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
    const tagId = this.props.params.tagId;
    const publicIds = this.state.uploadedPublicIds;
    const title = this.refs.title.value;
    const content = $('.post-summernote').summernote('code');
    if (!tagId) {
      alert('잘못된 접근입니다.');
      return;
    }
    Meteor.call('posts.insert', {
      title,
      content,
      tagId,
      publicIds,
    }, (err) => {
      if (err) {
        alert(err.message);
      } else {
        browserHistory.push(`/posts/${tagId}`);
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
      <div className="writing-form-component">
        {spinner}
        <form className="writing-form-form" onSubmit={(e) => { this.handleSubmit(e); }}>
          <label>제목</label>
          <input type="text" ref="title" />
          <label>내용</label>
          <div className="post-summernote"></div>
          <button className="writing-form-submit" type="submit">등록하기</button>
        </form>
      </div>
    );
  }
}

WritingForm.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default WritingForm;
