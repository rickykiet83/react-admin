import React, { Component, SyntheticEvent } from 'react';

import { FormState } from '../models/form.state';
import { IUser } from '../models/user.model';
import { IValues } from '../models/base.model';
import { Layout } from '../components/Layout';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';

export default class Profile extends Component<RouteComponentProps<any>> {
  state: FormState<IUser> = {
    data: {
      id: null,
      first_name: '',
      last_name: '',
      email: 'u1@gmail.com',
      password: '',
    },
    submitSuccess: false,
  };

  infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put('users/info', this.state.data);
  };

  passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put('users/password', {
      password: this.state.data.password,
      password_confirm: this.state.data.password,
    });
  };

  private setValues = (values: IValues) => {
    this.setState({ data: { ...this.state.data, ...values } });
  };

  private handleInputChanges = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    this.setValues({
      [e.currentTarget.id || e.currentTarget.name]: e.currentTarget.value,
    });
  };

  render() {
    const { email } = this.state.data;
    return (
      <Layout>
        <h2>Account Information</h2>
        <hr />
        <form>
          <div className='form-group'>
            <label>First Name</label>
            <input
              type='text'
              onChange={(e) => this.handleInputChanges(e)}
              className='form-control'
              name='first_name'
            />
          </div>
          <div className='form-group'>
            <label>Last Name</label>
            <input
              type='text'
              onChange={(e) => this.handleInputChanges(e)}
              className='form-control'
              name='last_name'
            />
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='text'
              defaultValue={email}
              onChange={(e) => this.handleInputChanges(e)}
              className='form-control'
              name='email'
            />
          </div>

          <button
            type='button'
            onClick={this.infoSubmit}
            className='btn btn-outline-secondary'
          >
            Save
          </button>
        </form>

        <h2 className='mt-4'>Change Password</h2>
        <hr />
        <form>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              onChange={(e) => this.handleInputChanges(e)}
              className='form-control'
              name='password'
            />
          </div>
          <div className='form-group'>
            <label>Password Confirm</label>
            <input
              type='password'
              onChange={(e) => this.handleInputChanges(e)}
              className='form-control'
              name='password_confirm'
            />
          </div>

          <button
            onClick={this.passwordSubmit}
            className='btn btn-outline-secondary'
          >
            Save
          </button>
        </form>
      </Layout>
    );
  }
}
