import styles from './styles.module.css'

export default function CreateMissionPage() {
  return (
    <div>
      <h1>Launch Mission Page</h1>
      <div>
        <form className={`${styles.formContainer}`}>
          <div>Name: <input placeholder="Enter mission name" /></div>
          <div>Resume folder link: <input placeholder="Resume folder link" /></div>
          <div>
            Selection Criteria: <textarea placeholder='Enter selection criteria' />
          </div>
          <div>
            Area of expertise: <input />
          </div>
        </form>
      </div>
    </div>
  );
}
