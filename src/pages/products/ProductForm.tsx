import { Button, TextField, TextareaAutosize } from '@material-ui/core';
import React, { Component, SyntheticEvent } from 'react';

import { IValues } from '../../models/base.model';
import { Layout } from '../../components/Layout';
import { Product } from '../../models/product.model';
import { Redirect } from 'react-router';
import axios from 'axios';

type State = {
  data: Product;
  submitSuccess: boolean;
};

export default class ProductForm extends Component {
  state: State = {
    data: {
      id: null,
      title: '',
      description: '',
      image: '',
      price: null,
    },
    submitSuccess: false,
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

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await axios.post('products', this.state.data);
    console.log(response);

    if (response.status === 201) this.setState({ submitSuccess: true });
  };

  render() {
    if (this.state.submitSuccess) {
      return <Redirect to='/products' />;
    }
    return (
      <Layout>
        <form>
          <div className='mb-3'>
            <TextField
              id='title'
              label='Title'
              onChange={(e) => this.handleInputChanges(e)}
            />
          </div>
          <div className='mb-3'>
            <TextareaAutosize
              onChange={(e) => this.handleInputChanges(e)}
              name='description'
              placeholder='Description'
              minRows={4}
            />
          </div>
          <div className='mb-3'>
            <TextField
              name='image'
              onChange={(e) => this.handleInputChanges(e)}
              label='Image'
            />
          </div>
          <div className='mb-3'>
            <TextField
              name='price'
              onChange={(e) => this.handleInputChanges(e)}
              label='Price'
            />
          </div>
          <Button
            type='submit'
            onClick={this.submit}
            variant='contained'
            color='primary'
          >
            Submit
          </Button>
        </form>
      </Layout>
    );
  }
}
