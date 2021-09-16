import { IUser, User } from '../models/user.model';
import React, { Component, Dispatch, SyntheticEvent } from 'react';

import { FormState } from '../models/form.state';
import { IValues } from '../models/base.model';
import Layout from '../components/Layout';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';

class Profile extends Component<any> {
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

  first_name = '';
  last_name = '';
  email = '';
  password = '';
  password_confirm = '';

  infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await axios.put('users/info', {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
    });
    const user: User = response.data;
    this.props.setUser(
      new User(user.id, user.first_name, user.last_name, user.email)
    );
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
    return (
      <Layout>
        <h2>Account Information</h2>
        <hr />
        <form>
          <div className='form-group'>
            <label>First Name</label>
            <input
              type='text'
              className='form-control'
              name='first_name'
              defaultValue={(this.first_name = this.props.user.first_name)}
              onChange={(e) => (this.first_name = e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>Last Name</label>
            <input
              type='text'
              className='form-control'
              name='last_name'
              defaultValue={(this.last_name = this.props.user.last_name)}
              onChange={(e) => (this.last_name = e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='text'
              className='form-control'
              name='email'
              defaultValue={(this.email = this.props.user.email)}
              onChange={(e) => (this.email = e.target.value)}
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

export default connect(
  (state: { user: User }) => ({
    user: state.user,
  }),
  (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user)),
  })
)(Profile);
