import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '../../ui/card';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../ui/select';
import { SyringeLogo } from '../../logo';


function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <SyringeLogo />
          <CardTitle>Create Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input type="text" placeholder="Your name" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div>
            <Label>Role</Label>
            <RadioGroup defaultValue="donor">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="donor" id="donor" />
                <Label htmlFor="donor">Donor</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="requester" id="requester" />
                <Label htmlFor="requester">Requester</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>City</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casa">Casablanca</SelectItem>
                <SelectItem value="rabat">Rabat</SelectItem>
                <SelectItem value="tanger">Tanger</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full">Register</Button>
          <p className="text-sm">
            Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
