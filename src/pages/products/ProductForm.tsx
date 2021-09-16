import { Button, TextField, TextareaAutosize } from '@material-ui/core';
import React, { Component, SyntheticEvent } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';

import { FormState } from '../../models/form.state';
import { IProduct } from '../../models/product.model';
import { IValues } from '../../models/base.model';
import Layout from '../../components/Layout';
import axios from 'axios';

export default class ProductForm extends Component<RouteComponentProps<any>> {
  state: FormState<IProduct> = {
    data: {
      id: null,
      title: '',
      description: '',
      image: '',
      price: null,
    },
    submitSuccess: false,
  };

  async componentDidMount() {
    await this.populateProduct();
  }

  async populateProduct() {
    try {
      const productId = this.props.match.params.id;
      if (productId === 'create') return;
      const { data } = await axios.get(`/products/${productId}`);

      this.setValues(data);
    } catch (error) {}
  }

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
    const productId = this.state.data.id;
    if (productId) {
      const { status } = await axios.put(
        `/products/${productId}`,
        this.state.data
      );
      if (status === 202) this.setState({ submitSuccess: true });
    } else {
      const { status } = await axios.post('products', this.state.data);

      if (status === 201) this.setState({ submitSuccess: true });
    }
  };

  render() {
    if (this.state.submitSuccess) {
      return <Redirect to='/products' />;
    }
    const { title, description, image, price } = this.state.data;
    return (
      <Layout>
        <form>
          <div className='mb-3'>
            <TextField
              id='title'
              label='Title'
              value={title}
              onChange={(e) => this.handleInputChanges(e)}
            />
          </div>
          <div className='mb-3'>
            <TextareaAutosize
              onChange={(e) => this.handleInputChanges(e)}
              name='description'
              value={description}
              placeholder='Description'
              minRows={4}
            />
          </div>
          <div className='mb-3'>
            <TextField
              name='image'
              value={image}
              onChange={(e) => this.handleInputChanges(e)}
              label='Image'
            />
          </div>
          <div className='mb-3'>
            <TextField
              name='price'
              value={price}
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
