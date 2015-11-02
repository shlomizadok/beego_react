// @APIVersion 1.0.0
// @Title beego Test API
// @Description beego has a very cool tools to autogenerate documents for your API
// @Contact astaxie@gmail.com
// @TermsOfServiceUrl http://beego.me/
// @License Apache 2.0
// @LicenseUrl http://www.apache.org/licenses/LICENSE-2.0.html
package routers

import (
	"beego_react/controllers"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{}, "get:Home")

	ns := beego.NewNamespace("/v1",
		beego.NSNamespace("/posts",
			beego.NSInclude(
				&controllers.PostController{},
			),
		),
	)
	beego.AddNamespace(ns)
}
