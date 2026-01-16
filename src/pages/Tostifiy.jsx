
import React from 'react'
import { toast } from 'react-toastify'

export const toastSuccess = (msg) => {
 toast.success(msg,{
   position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    theme: "dark",
 })
}

export const toastError = (msg)=>{
  toast.error(msg,{
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    theme: "dark",
  })
}
