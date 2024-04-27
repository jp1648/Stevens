/*Here, you can export the data functions
to get the comapnies, people, getCompanyByID, getPersonById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/

import { getCompaniesHelper, getPeopleHelper } from "../helpers.js";

export const getCompanies = async () => {
  const allCompanies = await getCompaniesHelper();
  return allCompanies;
};

export const getPeople = async () => {
  const allPeople = await getPeopleHelper();
  return allPeople;
};

export const getCompanyById = async (id) => {
  const allCompanies = await getCompaniesHelper();
  const company = allCompanies.find((company) => company.id === id);
  if (!company) throw "Company Not Found!";
  return company;
};

export const getPersonById = async (id) => {
  const allPeople = await getPeopleHelper();
  const person = allPeople.find((person) => person.id === id);
  if (!person) throw "Person Not Found!";
  return person;
};
