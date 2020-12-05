type Props = {
  pastYear: number
}

const OldAlert: React.FC<Props> = ({ pastYear }: Props) => (
  <div className="border-4 border-solid rounded-xl border-red-500 bg-red-400 px-4">
    <p>この記事は投稿から {pastYear} 年以上経過しています。<br />最新の情報は各種公式ドキュメント等をご覧下さい。</p>
  </div>
)

export default OldAlert;