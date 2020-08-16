<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 25/08/2016
 * Time: 18:39
 */

namespace Famoser\OnlineOfficeBundle\Form;


use Famoser\OnlineOfficeBundle\Form\Base\BaseFormType;
use Symfony\Component\Form\Extension\Core\Type\BirthdayType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PersonsType extends BaseFormType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        self::addSubmitButton(
            self::addFields($builder,
                array(
                    "email" => EmailType::class,
                    'honorificPrefix' => TextType::class,
                    'givenName' => TextType::class,
                    'familyName' => TextType::class,
                    'birthDate' => BirthdayType::class,
                    'telephone' => TextType::class
                )), "save", "Add Information");
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Famoser\OnlineOfficeBundle\Entity\Persons'
        ));
    }
}