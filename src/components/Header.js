import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const isHome = router.pathname === "/" ? true : false;
  return (
    <div>
      {!isHome && (
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>Back home</a>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Header;
