const AboutDescription = ({ description }: { description: string }) => (
  <div className="overflow-hidden rounded-lg bg-white shadow">
    <div className="px-4 py-5 sm:p-6">
      <p className="text-sm text-gray-600">
        {description === '' ? 'The creator has not yet provided a description.' : description}
      </p>
    </div>
  </div>
);

export default AboutDescription;
