import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Register(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username:'',
        password:'',
        confirmPassword:'',
        email:''
    })


const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: {register: userData}}) {
        context.login(userData)
        props.history.push('/');
    },
    onError(err){
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
});

function registerUser(){
    addUser();
}


        return (
            <div className="form-container">
                <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' :''}>
                    <h1>Register</h1>
                    <Form.Input 
                    label="Username" 
                    placeholder="Username.." 
                    name="username" 
                    type="text"
                    value={values.username}
                    error= {errors.username ? true: false }
                    onChange={onChange}
                    />
                    <Form.Input 
                    label="Password" 
                    placeholder="Password.." 
                    name="password" 
                    value={values.password}
                    type="password"
                    error= {errors.password ? true: false }
                    onChange={onChange}
                    />
                    <Form.Input 
                    label="ConfirmPassword" 
                    placeholder="ConfirmPassword.." 
                    name="confirmPassword" 
                    type="password"
                    value={values.confirmPassword}
                    error= {errors.confirmPassword ? true: false }
                    onChange={onChange}
                    />
                    <Form.Input 
                    label="Email" 
                    placeholder="Email.." 
                    name="email" 
                    type="text"
                    value={values.email}
                    error= {errors.email ? true: false }
                    onChange={onChange}
                    />
                    <Button type="submit" primary>
                        Register
                    </Button>
                </Form>
                {Object.keys(errors).length > 0 && (
                    <div className="ui error Message">
                    <ul className="list">
                        {
                            Object.values(errors).map(value=>(
                               <li key={value}>{value}</li> 
                            ))
                        }
                    </ul>
                </div>
                )}

            </div>
        );
    }

const REGISTER_USER = gql `
    mutation register(
        $username: String!
        $password: String!
        $confirmPassword: String!
        $email: String!
    ) {
        register(
            registerInput: {
                username: $username
                password: $password
                confirmPassword: $confirmPassword
                email: $email
            }
        ){
            id email username createdAt token
        }
    }
`

export default Register;