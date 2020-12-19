// height width 使用 equalTo
// left right bottom top 使用 inset

const { DOUBAN_POST_URL, DOUBAN_COOKIE } = require('./jsbox.config');

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

// textarea
const generateTextArea = ({
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
      // bgcolor: $color("black")
    },
    layout: function(make, view) {
      make.left.right.inset(0)
      make.top.inset(top)
      make.height.equalTo(160)
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
        type: "text",
        props: {
          placeholder,
          id,
          text,
          borderColor: $color("#aaa"),
          borderWidth: 2,
          cornerRadius: 4,
        },
        layout: function(make, view) {
          make.left.inset(80)
          make.right.inset(0)
          make.height.equalTo(160)
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
          inputName: 'Cookie: ',
          placeholder: '请输入豆瓣 cookie',
          top: 0,
          id: 'cookie',
          text: DOUBAN_COOKIE
        }),
        generateTextArea({
          inputName: '内容: ',
          text: '',
          placeholder: '请输入要发送的内容',
          top: 50,
          id: 'text'
        }),
        {
          type: "button",
          props: {
            title: "提交",
            bgcolor: $color("#409EFF")
          },
          layout: function(make, view) {
            make.top.inset(220)
            make.left.right.inset(0)
          },
          events: {
            tapped: function(sender) {
              const cookie = $('cookie').text;
              const text = $('text').text;

              if(!cookie || !text) {
                $ui.alert("请填写必要信息");
                return;
              }

              $http.request({
                method: "POST",
                url: DOUBAN_POST_URL,
                header: {
                  'Origin': 'https://www.douban.com',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
                  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                  'Referer': 'https://www.douban.com/',
                  'Cookie': cookie
                },
                body: {
                  ck: 'rej8',
                  comment: text,
                  privacy_and_reply_limit: 'P,'
                },
                handler: function(resp) {
                  const { error, data } = resp;
                  console.log(data);
                  if(error) {
                    $ui.alert("请求失败");
                    return
                  } else {
                    if(data.includes('_body_start')) {
                      $ui.alert("请求成功");
                      $('text').text = ''
                    } else {
                      $ui.alert("请求失败，检查 cookie 是否有效");
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