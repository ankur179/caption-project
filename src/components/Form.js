import React from 'react';
import "./styles/ReservationsContent.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required("Full name is a required field!"),
    email: yup.string().required("Email is a required field!").email("Email is not valid!"),
    telephone: yup.string().required("Telephone is a required field!").matches(/^(\+\d{2,3}\s)?\(?\d{3}\)?[\s.-]\d{2}[\s.-]\d{3}[\s.-]\d{4}$/, "Phone number must match the form 233 00 000 0000"),
    guests: yup.number().min(1, "There must be at least 1 guest!").required("Please specify number of guests per table!"),
    date: yup.string().required("Please select date and time!"),
});

function Form() {
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const formSubmit = (data) => {
        console.table(data);
    };

    return (
        <form onSubmit={handleSubmit(formSubmit)}>
            <fieldset>
                <div className="field">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" placeholder="John Doe" {...register("name")} />
                    <span className="error-message">{errors.name?.message}</span>
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" placeholder="text@email.com" {...register("email")} />
                    <span className="error-message">{errors.email?.message}</span>
                </div>
                <div className="field">
                    <label htmlFor="telephone">Telephone</label>
                    <input type="tel" id="telephone" placeholder="233 00 000 0000" {...register("telephone")} />
                    <span className="error-message">{errors.telephone?.message}</span>
                </div>
                <div className="field occasion">
                    <label htmlFor="occasion">Occasion (optional)</label>
                    <div className="options">
                        <select id="occasion" {...register("occasion")}>
                            <option value="select">Select occasion</option>
                            <option value="birthday">Birthday</option>
                            <option value="engagement">Engagement</option>
                            <option value="anniversary">Anniversary</option>
                        </select>
                    </div>
                </div>
                <div className="field guest">
                    <label htmlFor="guests">Guests</label>
                    <input type="number" id="guests" placeholder="2" {...register("guests")} />
                    <span className="error-message">{errors.guests?.message}</span>
                </div>
                <div className="field">
                    <label htmlFor="date">Date & Time</label>
                    <input type="datetime-local" id="date" {...register("date")} />
                    <span className="error-message">{errors.date?.message}</span>
                </div>
                <button className="reserve-btn" type="submit">Reserve</button>
            </fieldset>
        </form>
    );
}

export default Form;