import React from 'react';
import { Link } from 'react-router-dom';

import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '../../ui/card';
import { SyringeLogo } from '../../logo';
import { Button } from '../../ui/button';

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm p-4">
        <CardHeader>
          <SyringeLogo />
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full">Login</Button>
          <p className="text-sm">
            Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
