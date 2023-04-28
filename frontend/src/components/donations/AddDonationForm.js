import { useState } from "react"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createDonation } from "../../api/axios"
import { Button } from "@chakra-ui/react"

const AddDonationForm = () => {
  const donorID = useParams()
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [type, setType] = useState("")
  const [notes, setNotes] = useState("")
  const [emptyFields, setEmptyFields] = useState([])

  const [error, setError] = useState(null)
  //console.log(donorID);

  const navigate = useNavigate()
  const homelink = "/member/" + donorID.id

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      console.log(donorID)
      await createDonation(donorID.id, {
        donorID: donorID.id,
        amount: amount,
        date: date,
        type: type,
        notes: notes,
      }) 
      navigate(homelink)
    } catch (err) {
      setError(err.message)
    }
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add a New Donation</h2>

        <div>
          <div></div>
          <div>
            <label>Amount*</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={emptyFields.includes("amount") ? "error" : ""}
            />
          </div>
        </div>

        <div className="form-email">
          <label>Date of Donation*</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={emptyFields.includes("date") ? "error" : ""}
          />
        </div>

        <div className="form-email">
          <label>Type of Donation</label>
          <input
            type="String"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div className="form-email">
          <label>Additional Notes</label>
          <input
            type="String"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <Button onClick={handleSubmit} colorScheme="green ">
          Add Donation
        </Button>
      </form>
    </div>
  )
}

export default AddDonationForm
