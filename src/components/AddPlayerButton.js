import React, { Component } from "react";
import Button from './Button';

const AddPlayerButton = ({buttonText, onClick}) => 
    <Button onClick={onClick}>{buttonText}</Button>;

export default AddPlayerButton;
