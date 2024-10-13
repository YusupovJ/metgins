import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUsers } from "@/hooks/useUser";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const { data: users } = useUsers();

  return (
    <main className="my-5">
      <div className="container">
        <div className="flex mb-10 space-x-3 items-center">
          <Button size="icon" variant="secondary" className="p-2" onClick={() => navigate("/chat")}>
            <ArrowLeft />
          </Button>
          <h1 className="font-bold text-2xl">Список пользователей</h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Имя</TableHead>
              <TableHead>Роль</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role === "admin" ? "Администратор" : "Пользователь"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users?.pagination?.totalPages && <Pagination totalPages={users?.pagination?.totalPages} className="my-10" />}
      </div>
    </main>
  );
};

export default Users;
