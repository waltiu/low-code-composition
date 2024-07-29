import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routers'
import './App.css'
import '@packages/editor'
import { Button } from 'antd'

function App() {
  const mockClick = () => {
    console.log(Notification.permission,'Notification.permission')
    if (Notification.permission !== "granted") {
      if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            // 用户已同意接收通知
            console.log('click')
            new Notification("1111", {
              body: "这是通知的内容。",
              icon: "https://example.com/notification-icon.png", // 可选，用于设置通知图标
              tag: "unique-tag", // 可选，用于区分不同的通知
            });
          } else {
            // 用户拒绝或未决定
          }
        });
      }
    }else{
      console.log('click2')
      const notifaction= new Notification("1111", {
        body: "这是通知的内容。",
        icon: "https://example.com/notification-icon.png", // 可选，用于设置通知图标
        tag: "unique-tag", // 可选，用于区分不同的通知
      });
      notifaction.onshow=()=>{
        console.log('show')
      }
      notifaction.onerror=(e)=>{
        console.log('onerror',e)
      }
      notifaction.onclose=()=>{
        console.log('close')
        notifaction.close()

      }
      // setTimeout(() => {
      //   notifaction.close()
      // }, 30000);
    }
  }
  useEffect(() => {

    console.log(111)
  }, [])
  return (
    <>
      {/* <Button onClick={() => mockClick()}>111</Button> */}
      <RouterProvider router={routes} />
    </>
  )
}

export default App
