// app/ppr-demo/components/static-content.tsx

export default function StaticContent() {
  // 빌드 시점에 한 번만 실행됨
  const buildTime = new Date().toLocaleString();
  
  return (
    <div>
      <p>이 컨텐츠는 빌드 시점에 생성되었습니다.</p>
      <p className="font-mono mt-2">빌드 시간: {buildTime}</p>
      <ul className="list-disc pl-5 mt-2">
        <li>페이지 로드 시 즉시 표시됩니다</li>
        <li>모든 사용자에게 동일한 내용이 표시됩니다</li>
        <li>CDN에 캐싱됩니다</li>
      </ul>
    </div>
  );
}