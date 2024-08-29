  "use client"

  import { useState, useEffect } from "react"
  import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
  import { signOut } from "next-auth/react";
  import { Button } from "@/components/ui/button";

  export default function Component() {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const usersPerPage = 10

    useEffect(() => {
      async function fetchUsers() {
        try {
          const response = await fetch('/api/users')
          if (!response.ok) {
            throw new Error('Failed to fetch users')
          }
          const data = await response.json()
          setUsers(data)
        } catch (error) {
          console.error('Error fetching users:', error)
        }
      }

      fetchUsers()
    }, [])

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
      <div className=" ">
        <div className="flex items-center justify-between m-6">
          <h1 className="text-2xl font-bold">Users</h1>
        </div>
        <div className="overflow-x-auto m-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      
          <div className="flex justify-center mt-4 space-x-2 gap-2">
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
              <Button key={index + 1} onClick={() => paginate(index + 1)} className="mx-1">
                {index + 1}
              </Button>
            ))}
          </div>
          <br></br>
          <div className="flex justify-center m-8">
            <Button className="mt-8 mx-2" onClick={() => signOut()}>Deslogar</Button>
          </div>
        
      </div>
    )
  }