import React from 'react'
import { Input, InputGroup } from "rsuite";
import { Icon } from "rsuite";
import Select from 'react-select'
import breed from '../../data/breed.json'
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
  
const breedTags = breed.map(item=>(
    {
        'label':item.name,
        'value':item.name
    }
))
const styles = {
    width: "50%",
    marginBottom: 10,
  };
  const inputStyle = {
    fontFamily: "Raleway",
    fontSize: 20,
  };
  const buttonStyle = {
    height: "100%",
  };
export default function AdoptionSearch() {
    return (
        <>
             <InputGroup inside style={styles}>
          <Input style={inputStyle} />
          <InputGroup.Button style={buttonStyle}>
            <Icon icon="search" />
          </InputGroup.Button>
        </InputGroup>
        {/* selection */}
        <Select
        className='selectBreed'
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={breedTags}
    />
        </>
    )
}
