import React from 'react'
import Header from '../Admincomponents/Header'
import { Routes, Route } from 'react-router-dom'
import AdminProductsPage from '../Adminpages/AdminProductPage'
import AdminConnectionsPage from '../Adminpages/AdminConnectionsPage'
import AdminSettingsPage from '../Adminpages/AdminSettingsPage'

const AdminPanel = () => {
  return (
    <div>
        <Header/>
        <Routes>
            <Route path="/" element={<AdminProductsPage/>}></Route>
            <Route path="/Connection" element={<AdminConnectionsPage/>}></Route>
            <Route path="/settings" element={<AdminSettingsPage/>}></Route>
        </Routes>
      
    </div>
  )
}

export default AdminPanel
