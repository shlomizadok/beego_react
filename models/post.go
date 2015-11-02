package models

import (
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/validation"
	"time"
	"fmt"
	"strconv"
	"errors"
)

type Post struct {
	Id        int
	Title	  string `valid:"Required"`
	Blog      string `orm:"type(text)"`
	CreatedAt  time.Time `orm:"auto_now_add;type(datetime)"`
}

func init() {
	orm.RegisterModel(new(Post))
}

func (u *Post) TableName() string {
	return "posts"
}

func GetAll() []*Post {
	var posts []*Post
	o := orm.NewOrm()
	qs := o.QueryTable("posts")
	num, err := qs.All(&posts)
	if num > 0 {
		fmt.Println(err)
	}

	return posts
}

func Create(post Post) (p Post, err error) {
	o := orm.NewOrm()
	valid := validation.Validation{}
	valid.Required(post.Title, "title")
	if valid.HasErrors() {
		// validation does not pass
		// print invalid message
		return p, errors.New("hshshshs")
	}
	id, err := o.Insert(&post)
	if err == nil {
		fmt.Println(id)
	}
	return post, nil
}

func GetOne(id string) (Post, error) {
	uid, _ := strconv.Atoi(id)
	post := Post{Id: uid}
	o := orm.NewOrm()
	err := o.Read(&post)
	if err == orm.ErrNoRows {
		fmt.Println(errors.New("not"))
		return post, errors.New("404")
	} else {
		return post, nil
	}
}

func Update(post Post) (p Post, err error) {
	fmt.Println(post.Id)
	o := orm.NewOrm()
	valid := validation.Validation{}
	valid.Required(post.Title, "title")
	if valid.HasErrors() {
		// validation does not pass
		// print invalid message
		return p, errors.New("hshshshs")
	}
	id, err := o.Update(&post)
	if err == nil {
		fmt.Println(id)
	} else {
		fmt.Println(err)
	}
	return post, err
}

func Delete(id int) (bool, error) {
	o := orm.NewOrm()
	if num, err := o.Delete(&Post{Id: id}); err == nil {
		fmt.Println(num)
		return true, nil
	}
	return false, errors.New("Error")
}
