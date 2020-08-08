// height width 使用 equalTo
// left right bottom top 使用 inset

const { POST_URL, TOKEN } = require('./jsbox.config');

const generateInputRow = ({
  inputName,
  placeholder,
  id,
  top,  // 距离顶部的距离
  height = 40,  // 一行的高度
  text
}) => {
  return {
    type: 'view',
    props: {
      // bgcolor: $color("#ff0")
    },
    layout: function(make, view) {
      make.left.right.inset(0)
      make.top.inset(top)
      make.height.equalTo(height)
    },
    views: [
      {
        type: "label",
        props: {
          text: inputName,
          textColor: $color("#606266"),
        },
        layout: function(make, view) {
          make.height.equalTo(height)
        }
      },
      {
        type: "input",
        props: {
          placeholder,
          id,
          text
        },
        layout: function(make, view) {
          make.left.inset(80)
          make.right.inset(0)
          make.height.equalTo(height)
        },
        handler: function(text) {
        }
      }
    ]
  }
}

$ui.render({
  type: 'view',
  props: {
    // bgcolor: $color("#FF0000")
  },
  layout: $layout.fill,
  views: [
    {
      type: 'view',
      props: {
      },
      layout: function(make, view) {
        make.left.right.inset(20)
        make.top.bottom.equalTo(20)
      },
      views: [
        generateInputRow({
          inputName: 'Token: ',
          placeholder: '请输入 token',
          top: 0,
          id: 'token',
          text: TOKEN
        }),
        generateInputRow({
          inputName: '链接: ',
          placeholder: '请输入要分享的链接',
          top: 50,
          id: 'link'
        }),
        generateInputRow({
          inputName: '标题: ',
          placeholder: '请输入文章标题',
          top: 100,
          id: 'title'
        }),
        {
          type: "button",
          props: {
            title: "提交",
            bgcolor: $color("#409EFF")
          },
          layout: function(make, view) {
            make.top.inset(150)
            make.left.right.inset(0)
          },
          events: {
            tapped: function(sender) {
              const token = $('token').text;
              const link = $('link').text;
              const title = $('title').text;

              if(!token || !link || !title) {
                $ui.alert("请填写必要信息");
                return;
              }

              $http.request({
                method: "POST",
                url: POST_URL,
                header: {
                  'Content-Type': 'application/json',
                  Authorization: `token ${token}`
                },
                body: {
                  title,
                  body: link
                },
                handler: function(resp) {
                  const { error, data } = resp;
                  if(error) {
                    $ui.alert("请求失败");
                    return
                  } else {
                    if(data.title) {
                      $ui.alert("请求成功");
                          $('link').text = ''
                    } else {
                      $ui.alert("请求失败");
                    }
                  }
                }
              })
            }
          }
        }
      ]
    }
  ]
})