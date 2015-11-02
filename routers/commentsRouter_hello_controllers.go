package routers

import (
	"github.com/astaxie/beego"
)

func init() {

	beego.GlobalControllerRouter["beego_react/controllers:MainController"] = append(beego.GlobalControllerRouter["beego_react/controllers:MainController"],
		beego.ControllerComments{
			"Home",
			`/`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["beego_react/controllers:PostController"] = append(beego.GlobalControllerRouter["beego_react/controllers:PostController"],
		beego.ControllerComments{
			"GetAll",
			`/`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["beego_react/controllers:PostController"] = append(beego.GlobalControllerRouter["beego_react/controllers:PostController"],
		beego.ControllerComments{
			"Create",
			`/`,
			[]string{"post"},
			nil})

	beego.GlobalControllerRouter["beego_react/controllers:PostController"] = append(beego.GlobalControllerRouter["beego_react/controllers:PostController"],
		beego.ControllerComments{
			"GetOne",
			`/:id`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["beego_react/controllers:PostController"] = append(beego.GlobalControllerRouter["beego_react/controllers:PostController"],
		beego.ControllerComments{
			"Update",
			`/:id`,
			[]string{"put"},
			nil})

	beego.GlobalControllerRouter["beego_react/controllers:PostController"] = append(beego.GlobalControllerRouter["beego_react/controllers:PostController"],
		beego.ControllerComments{
			"Delete",
			`/:id`,
			[]string{"delete"},
			nil})

}
