// src/components/forms/Cardform.jsx
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { Input } from "./Input";
import { Label } from "./Label";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import Navbar from "../../components/customer_nav/Topnavbar"; // Adjust the path based on your file structure
import Sidenav from "../../components/customer_nav/Customersidenav";

export default function CardForm() {
  return (
    <Card>
      <CardContent>
        <form>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>

          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter a description" />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
