import { setPath } from "@/redux/Reducer/PathReducer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Path = () => {
	const { paths } = useSelector((state: any) => state.path);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		navigate(paths[paths.length - 1].link);
	}, [paths]);

	const formattedPaths = paths.map((path: any, index: number) => {
		if (path.link) {
			return (
				<React.Fragment key={path.link}>
					{index > 0 && " / "}{" "}
					<Link
						className={`${
							index === paths.length - 1 && index > 0 && "text-primary"
						}`}
						to={path.link}
						onClick={() =>
							dispatch(
								setPath(paths.filter((path: any, i: number) => i <= index))
							)
						}>
						{path.name}
					</Link>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment key={path.name}>
					{index > 0 && " / "} {path.name}
				</React.Fragment>
			);
		}
	});

	return <>{formattedPaths}</>;
};

export default Path;
