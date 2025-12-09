

import React from 'react'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function CommanForm({ formControls, formData, setFormData, onSubmit, buttonText, showButton = true }) {

  function renderInputByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || ""

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            type={getControlItem.type}
            value={value}
            onChange={event => setFormData({
              ...formData, [getControlItem.name]: event.target.value
            })}
          />
        );
        break;

      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(selectedValue) =>
              setFormData({
                ...formData,
                [getControlItem.name]: selectedValue,
              })
            }
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {
                getControlItem.options && getControlItem.options.length > 0 ?
                  getControlItem.options.map(optionItem =>
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ) : null
              }
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={event => setFormData({
              ...formData, [getControlItem.name]: event.target.value
            })}
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={event => setFormData({
              ...formData, [getControlItem.name]: event.target.value
            })}
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-5'>
        {
          formControls.map((controlItem) => (
            <div key={controlItem.name} className='grid w-full gap-1.5'>
              <div className='flex justify-between'>
                <Label className='mb-1'>{controlItem.label}</Label>
                {/* <div className='flex gap-2'>
                  <Link to="/forgot-password" className='text-orange-300 hover:underline'>
                    {controlItem.label2}
                  </Link>
                  {controlItem.common}
                  <Link to="/reset-password" className='text-green-400 hover:underline'>
                    {controlItem.label1}
                  </Link>
                </div> */}
              </div>

              {renderInputByComponentType(controlItem)}
            </div>
          ))
        }
      </div>

      {/* Only NEW logic added — hide/show button */}
      {showButton && (
        <Button
          type='submit'
          className={`mt-2 w-full ${buttonText === 'Send OTP'
            ? 'bg-orange-200 hover:bg-orange-300 text-orange-800'
            : ''}`}
        >
          {buttonText || "submit"}
        </Button>
      )}
    </form>
  )
}

export default CommanForm
