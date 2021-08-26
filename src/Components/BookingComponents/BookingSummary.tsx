export const BookingSummary = () => {
  return (
    <>
      <h1>BookingSummary works!</h1>
      <h2>You're reservation has been confirmed</h2>
      <table>
        <tr>
          <th>Date</th>
          <th>Guests</th>
          <th>Time</th>
          <th>Booking reference</th>
        </tr>
        <tr>
          <td>11/11</td>
          <td>2</td>
          <td>18:00</td>
          <td>ABC123</td>
        </tr>
        <tbody>
          <th>Guest Information</th>
          <tr>
            First name:
            <td>Lorem Ipsum</td>
          </tr>
          <tr>
            Last name:
            <td>Lorem Ipsum</td>
          </tr>
          <tr>
            Email:
            <td>lorem@ipsum.com</td>
          </tr>
          <tr>
            Phone number:
            <td>+123 45 67 89</td>
          </tr>
          <tr>
            Additional info
            <td>Lorem ipsum dolor sit amet</td>
          </tr>
        </tbody>
      </table>
      <button>DELETE BOOKING</button>
    </>
  );
};
