
var PostList = React.createClass({
  render: function() {
    var postNodes = this.props.data.map(function (post) {
      return (
        <Post key={post.Id} title={post.Title}>
          {post.Blog}
        </Post>
      );
    });
    return (
      <div className="postList">
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
      <div className="post panel panel-default">
        <div className="panel-heading">
          <h2 className="postTitle panel-title">
            {this.props.title}
          </h2>
        </div>
        <div className="panel-body">
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      </div>
    );
  }
});

var PostForm = React.createClass({
  getInitialState: function(){
    return {
        condition: true
    }
  },

  handleClick :function(){
      this.setState( { condition : !this.state.condition } );
  },
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
      <div className="post-form">
        <div className="form-group">
          <button type="button" className="btn btn-primary" onClick={this.handleClick}>Add a new post</button>
        </div>
        <form className={this.state.condition ? "hide" :"show"} onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" required placeholder="title..." ref="title" />
          </div>
          <div className="form-group">
            <textarea rows="4" className="form-control" cols="50" placeholder="Say something... (markdown supported)" ref="blog"></textarea>
          </div>
          <div className="form-group">
            <input className="btn btn-default" type="submit" value="Post" />
          </div>
        </form>
      </div>
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
      <div className="postBox">
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
