import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {requestReconfirm, formAction} from '../actions';

const RequestReconfirmForm = reduxForm({
  form: 'requestReconfirmPassword'
})(({handleSubmit, submitting, submitSucceeded, error, onSubmit, auth: {messages, formPlugin: {renderInput, SubmitButton, FormError, Form}}}) => {
  if (submitSucceeded) {
    return <p>{messages.reqeustReconfirmSucceeded}</p>;
  }
  return (
    <Form onSubmit={handleSubmit(formAction(onSubmit))}>
      <Field
        name="email"
        label="Email"
        component={renderInput}
      />
      <SubmitButton
        label={submitting ? 'Resending Confirmation Instructions...' : 'Resend Confirmation Instructions'}
        disabled={submitting}
      />
    {error && <FormError>{error}</FormError>}
    </Form>
  );
});

const RequestReconfirm = ({doRequestReconfirm, ...rest}) => {
  const {auth: {AuthLinks, formPlugin: {View, Heading}}} = rest;
  return (
    <View>
      <Heading>
        Resend Confirmation Instructions
      </Heading>
      <RequestReconfirmForm onSubmit={doRequestReconfirm} {...rest} />
      <AuthLinks />
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    doRequestReconfirm: data => requestReconfirm(data, dispatch)
  };
};

const RequestReconfirmContainer = connect(null, mapDispatchToProps)(RequestReconfirm);

export {
  RequestReconfirmForm,
  RequestReconfirm,
  RequestReconfirmContainer as default
};
