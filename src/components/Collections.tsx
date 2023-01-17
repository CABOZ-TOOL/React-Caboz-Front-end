import React from "react";
import solicon from "../assets/images/sol-icon.png";
import deGod from "../assets/images/projects/degods.png";
import deMan from "../assets/images/projects/inkworklabs.png";
import blockSmith from "../assets/images/projects/blocksmithlabs.png";
import cetsonCreck from "../assets/images/projects/cetsoncreck.png";
import okayBears from "../assets/images/projects/okaybears.png";
import trippinApe from "../assets/images/projects/trippinapetribe.png";
import froots from "../assets/images/projects/froots.png";
import aurory from "../assets/images/projects/aurory.png";
import vandalCity from "../assets/images/projects/vandalcity.png";
import gothicdegens from "../assets/images/projects/gothicdegens.png";

export interface Collection {
  categories: any[];
  description: string;
  discord: string;
  image: string;
  isBadged: boolean;
  name: string;
  symbol: string;
  twitter: string;
  website: string;
}

interface Props {
  title: string;
  collections: Collection[]
}

const Collections = (props: Props) => {
  const { title, collections } = props;
  const midLength = collections.length / 2;
  const collections1 = collections.slice(0, midLength);
  const collections2 = collections.slice(midLength, collections.length);
  return (
    <div className="row collections row-cols-1 mb-4 aos-init gx-0 pb-4">
      <div className="px-2 py-4">
        <h3 className="float-left mx-2">{title}</h3>
        <a className="btn btn-dark btn-md rounded-3 shadow-none inlineblock view-all float-right">
          View All <i className="mx-2 fa-solid fa-table-list"></i>
        </a>
      </div>
      <div className="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xxl-2 px-1">
        <div className="col col-xs-1">
          <div className="table-responsive text-nowrap">
            <table className="table table-sm table-borderless white-text my-0 text-small table-fixed">
              <thead>
                <tr>
                  <th data-width="25px"></th>
                  <th className="valign-mid" colSpan={2} data-width="150px">
                    Collection Name
                  </th>
                  <th className="valign-mid text-right" data-width="80px">
                    Ceiling Price
                  </th>
                  <th className="valign-mid text-right" data-width="80px">
                    Floor Price
                  </th>
                  <th className="valign-mid text-right" data-width="80px">
                    Active Trades
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  collections1.map((collection, idx) =>
                  (
                    <tr
                      className="goto-collection"
                      key={idx}
                    //onClick="window.location='./project.php?proj=Cets On Creck';"
                    >
                      <td data-width="20px" className="number-list valign-mid">
                        {idx + 1}
                      </td>
                      <td className="valign-mid">
                        <a href="#" className="project-link">
                          <img
                            src={collection.image}
                            alt=""
                            className="img-fluid mx-auto d-block proj-img"
                          />
                        </a>
                      </td>
                      <td className="valign-mid">
                        <span className="project-title-0">
                          {collection.name}
                        </span>
                      </td>
                      <td className="text-right valign-mid">
                        <img src={solicon}
                          style={{ display: "inline-block" }} className="sol-icon" /> 75
                      </td>
                      <td className="text-right valign-mid">
                        <img src={solicon}
                          style={{ display: "inline-block" }} className="sol-icon" /> 69
                      </td>
                      <td className="text-right valign-mid">184</td>
                    </tr>
                  )
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="col col-xs-1 mb-2 d-none d-lg-block">
          <div className="table-responsive text-nowrap">
            <table className="table table-sm table-borderless white-text my-0 text-small table-fixed">
              <thead className="thead-tble">
                <tr className="no-border">
                  <th data-width="25px"></th>
                  <th className="valign-mid" colSpan={2} data-width="150px">
                    Collection Name
                  </th>
                  <th className="valign-mid text-right" data-width="80px">
                    Ceiling Price
                  </th>
                  <th className="valign-mid text-right" data-width="80px">
                    Floor Price
                  </th>
                  <th className="valign-mid text-right" data-width="80px">
                    Active Trades
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  collections2.map((collection, idx) =>
                  (
                    <tr
                      className="goto-collection"
                      key={midLength + idx}
                    >
                      <td data-width="20px" className="number-list valign-mid">
                        {midLength + idx + 1}
                      </td>
                      <td className="valign-mid">
                        <a href="#" className="project-link">
                          <img
                            src={collection.image}
                            alt=""
                            className="img-fluid mx-auto d-block proj-img"
                          />
                        </a>
                      </td>
                      <td className="valign-mid">
                        <span className="project-title-0">
                          {collection.name}
                        </span>
                      </td>
                      <td className="text-right valign-mid">
                        <img src={solicon}
                          style={{ display: "inline-block" }} className="sol-icon" /> 75
                      </td>
                      <td className="text-right valign-mid">
                        <img src={solicon}
                          style={{ display: "inline-block" }} className="sol-icon" /> 69
                      </td>
                      <td className="text-right valign-mid">184</td>
                    </tr>
                  )
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>)
}

export default Collections; 