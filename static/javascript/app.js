
var PostList = React.createClass({
  render: function() {
    var postNodes = this.props.data.map(function (post) {
      return (
        <Post title={post.Title}>
          {post.Blog}
        </Post>
      );
    });
    return (
      <div className="commentList">
        {postNodes}
      </div>
    );
  }
});

var Post = React.createClass({
    rawMarkup: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
      },
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.title}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var PostForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.refs.title.value.trim();
    var blog = this.refs.blog.value.trim();
    if (!title || !blog) {
      return;
    }
    this.props.onPostSubmit({Title: title, Blog: blog});
    this.refs.title.value = '';
    this.refs.blog.value = '';
    return;
  },
  render: function() {
    return (
      <form className="postForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="title..." ref="title" />
        <input type="text" placeholder="Say something..." ref="blog" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var PostBox = React.createClass({
  loadPostsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handlePostSubmit: function(post) {
    var posts = this.state.data;
    var newPosts = posts.concat([post]);
    this.setState({data: newPosts});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: post,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPostsFromServer();
    setInterval(this.loadPostsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Posts</h1>
        <PostList data={this.state.data} />
        <PostForm onPostSubmit={this.handlePostSubmit} />

      </div>
    );
  }
});

ReactDOM.render(
  <PostBox url="/v1/posts" pollInterval={20000} />,
  document.getElementById('content')
);
