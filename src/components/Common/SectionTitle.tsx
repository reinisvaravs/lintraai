const SectionTitle = ({
  subtitle,
  title,
  paragraph,
  width = "635px",
  center,
}: {
  subtitle?: string;
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
}) => {
  return (
    <div className="-mx-4 flex flex-wrap">
      <div
        className={`wow fadeInUp w-full px-4 ${
          center ? "mx-auto text-center" : ""
        }`}
        data-wow-delay=".1s"
        style={{ maxWidth: width }}
      >
        {subtitle && (
          <span className="mb-2 block text-lg font-semibold text-secondary-LIGHT_GRAY">
            {subtitle}
          </span>
        )}
        <h2 className="text-secondary-GRAY mb-4 text-3xl font-bold  sm:text-4xl md:text-[40px] md:leading-[1.2]">
          {title}
        </h2>
        <p className="text-base leading-relaxed text-secondary-LIGHT_GRAY dark:text-dark-6 sm:leading-relaxed">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SectionTitle;
