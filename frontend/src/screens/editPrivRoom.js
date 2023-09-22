import React from "react";
import { useParams } from "react-router-dom";

import Input from "../components/PrivateScreenForm/Input";
import Button from "../components/PrivateScreenForm/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../components/util/validators";
import "./inputPrivRoom.css";
import { useForm } from "../components/PrivateScreenHooks/privScform-hook";


const DUMMY_PRIVSCREENS = [ // dummy data for private screening rooms
  {
    id: 'p1',
    privscname: 'Panoramic Screen 1',
    privseatcapacity: '10',
    privscdescription: 'Screen 1 is the largest screen in the cinema',
    privscprice: '5800.00',
    privsclocation: '2nd Floor, Left of the main entrance',
    imageUrl: 'https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g'
  
  },
  {
    id: 'p2',
    privscname: 'Screen 1',
    privseatcapacity: '100',
    privscdescription: 'Screen 1 is the largest screen in the cinema',
    privscprice: '£100',
    privsclocation: 'London',
    imageUrl: 'https://fastly.picsum.photos/id/85/1280/774.jpg?hmac=h_HHpvfhMmLP6uOSrHS7HSlXVRuMKfBbc8HFKd1Acv4'
  
  },
  

];



const EditPrivRoom = () => {
  const privScId = useParams().privScId;

  const identifiedPrivSc = DUMMY_PRIVSCREENS.find(p => p.id === privScId);

  const [formState, inputHandler] =useForm({
    privscname: {
      value: identifiedPrivSc.privscname,
      isValid: true,
    },
    privscprice: {
      value: identifiedPrivSc.privscprice,
      isValid: true,
    },
    privseatcapacity: {
      value: identifiedPrivSc.privseatcapacity,
      isValid: true,
    },
    privsclocation: {
      value: identifiedPrivSc.privsclocation,
      isValid: true,
    },
    privscdescription: {
      value: identifiedPrivSc.privscdescription,
      isValid: true,
    },

  },true);

  if (!identifiedPrivSc) {
    return (
      <div className="center">
        <h2>Could not find private screening room!</h2>
      </div>
    );
  }
  return (   
  <form className="privscreen-form" >
  <h4 className="form-heading mb-4 text-primary text-center">
    Edit Private Screening Room
  </h4>
  <Input
    id="privscname"
    element="input"
    type="text"
    label="Screening Room Name"
    validators={[VALIDATOR_REQUIRE()]}
    errorText="Please enter a valid screening name."
    onInput={inputHandler}
    initialValue={formState.inputs.privscname.value}
    initialValid={formState.inputs.privscname.isValid}

  />  
  <Input
    id="privscprice"
    element="input"
    type="text"
    label="Screening Room Price"
    validators={[VALIDATOR_REQUIRE()]}
    errorText="Please enter a valid screening price."
    onInput={inputHandler}
    initialValue={formState.inputs.privscprice.value}
    initialValid={formState.inputs.privscprice.isValid}
  />
  <Input
    id="privseatcapacity"
    element="input"
    type="text"
    label="Screening Room Seat Capacity"
    validators={[VALIDATOR_REQUIRE()]}
    errorText="Please enter a valid screening seat capacity."
    onInput={inputHandler}
    initialValue={formState.inputs.privseatcapacity.value}
    initialValid={formState.inputs.privseatcapacity.isValid}
  />
  <Input
    id="privsclocation"
    element="input"
    type="text"
    label="Screening Room Location"
    validators={[VALIDATOR_REQUIRE()]}
    errorText="Please enter a valid screening location."
    onInput={inputHandler}
    initialValue={formState.inputs.privsclocation.value}
    initialValid={formState.inputs.privsclocation.isValid}
  />
  <Input
    id="privscdescription"
    element="textarea"
    label="Screening Room Description"
    validators={[VALIDATOR_MINLENGTH(5)]}
    errorText="Please enter a valid screening room description.(at least 5 characters.)"
    onInput={inputHandler}
    initialValue={formState.inputs.privscdescription.value}
    initialValid={formState.inputs.privscdescription.isValid}
  />
  <Button type="submit" disabled={!formState.isValid}>
    EDIT ROOM
  </Button>
  
  </form> 
    
    

  );






};

export default EditPrivRoom;