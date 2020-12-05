const Profile: React.FC = () => {
  return (
    <div className="h-32 flex align-top my-8">
      <img src="/img/profile.png" className="h-full rounded-full" alt="OldBigBuddha" />
      <div className="ml-4">
        <div className="text-2xl font-bold">Name: OldBigBuddha</div>
        <ul className="text-xl">
          <li>Twitter: <a href="https://twitter.com/OldBigBuddha">@OldBigBuddha</a></li>
          <li>GitHub: <a href="https://github.com/OldBigBuddha">OldBigBuddha</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Profile
