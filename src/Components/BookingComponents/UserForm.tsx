export const UserForm = () => {
  return (
    <>
      <h1>UserForm works!</h1>
      <form>
        <input type="text" name="firstName" placeholder="First name" />
        <input type="text" name="lastName" placeholder="Last name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="tel" name="tel" placeholder="Phone number" />
        <input
          type="text"
          name="addlInfo"
          placeholder="Additional information"
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
